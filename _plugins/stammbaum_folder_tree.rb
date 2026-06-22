# frozen_string_literal: true

# Generates site.data["stammbaum"] from content/stammbaum folders at Jekyll build time.
# Note: GitHub Pages runs Jekyll in safe mode and ignores unsupported custom plugins.
# For GitHub Pages, run scripts/generate_stammbaum_data.py before building or use the included Action.
require "json"

module DrDebug
  class StammbaumFolderTree < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      root_rel = site.config.dig("stammbaum", "root_dir") || "content/stammbaum"
      root = File.join(site.source, root_rel)
      return unless Dir.exist?(root)

      site.data["stammbaum"] = build_node(root, [])
    end

    private

    def load_meta(folder)
      file = File.join(folder, ".branch.json")
      return default_meta(folder) unless File.exist?(file)

      JSON.parse(File.read(file))
    rescue JSON::ParserError => e
      raise "Invalid JSON in #{file}: #{e.message}"
    end

    def default_meta(folder)
      label = File.basename(folder).sub(/^\d{1,4}-/, "").tr("-", " ").split.map(&:capitalize).join(" ")
      { "label" => label, "order" => 9999, "node_kind" => "branch_or_endpoint" }
    end

    def child_dirs(folder)
      Dir.children(folder)
         .map { |name| File.join(folder, name) }
         .select { |path| File.directory?(path) }
         .reject { |path| File.basename(path).start_with?(".", "_") }
         .sort_by do |path|
           meta = load_meta(path)
           [meta.fetch("order", 9999), meta.fetch("label", File.basename(path)).downcase, File.basename(path)]
         end
    end

    def build_node(folder, path_parts)
      meta = load_meta(folder)
      label = meta.fetch("label", File.basename(folder))
      slug = File.basename(folder)
      node = {
        "label" => label,
        "slug" => slug,
        "path" => (path_parts + [slug]).join("/"),
        "node_kind" => meta.fetch("node_kind", "branch_or_endpoint")
      }

      %w[order count status source_count relation_type canonical_id].each do |key|
        node[key] = meta[key] if meta.key?(key)
      end

      children = child_dirs(folder).map { |child| build_node(child, path_parts + [slug]) }
      unless children.empty?
        node["children"] = children
        node["children_count"] = children.length
      end

      node
    end
  end
end

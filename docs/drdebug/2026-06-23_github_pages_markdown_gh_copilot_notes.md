# GitHub Pages, Markdown, gh and Copilot CLI Notes

Date: 2026-06-23
Status: RESEARCH_NOTE
Canonical: false
Review required: true

## GitHub Pages

GitHub Pages can publish static site content from a repository. When branch publishing is used, Jekyll may process the site unless `.nojekyll` disables Jekyll processing.

GitHub Pages must not be treated as a server runtime for PHP, Ruby or Python application code. It is a static publishing target.

## Jekyll

Jekyll turns Markdown, HTML, Liquid templates, layouts, includes and data into a static site.

For Dr.Debug web work, Jekyll-related checks should be classified as:

- local optional validation, or
- remote GitHub Pages validation

Local Jekyll must not be a hard gate unless the user confirms that local rendering is required.

## GitHub Markdown

GitHub Markdown supports fenced code blocks and syntax highlighting. In GitHub Markdown contexts, certain blocks can render diagrams or structured previews such as Mermaid, GeoJSON, TopoJSON and ASCII STL.

## GitHub Pages Markdown

GitHub Pages/Jekyll commonly uses Markdown processors such as kramdown or GitHub Flavored Markdown depending on configuration.

## BBCode

BBCode is not a native GitHub Markdown or GitHub Pages feature. Treat BBCode as unsupported unless a project-specific converter or plugin is intentionally added and validated.

## GitHub CLI syntax seeds

    gh
    gh COMMAND
    gh COMMAND SUBCOMMAND --help
    gh auth status
    gh repo view
    gh pr status
    gh workflow list
    gh run list
    gh run view
    gh pages

## GitHub Copilot CLI syntax seeds

    copilot
    copilot help
    copilot -p "question or task"
    copilot --allow-tool='shell(git status)'
    copilot --allow-tool='shell(git:*)' --deny-tool='shell(git push)'
    copilot --cloud
    /sandbox enable

## Copilot CLI safety

Treat broad automatic approval options as high risk. A tool rule that allows shell or file write access can change local files. Deny rules and sandboxing should be preferred for exploratory use.

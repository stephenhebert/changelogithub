import { getGitDiff } from '@stephenhebert/changelogen'
import type { ChangelogOptions } from './types'
import { generateMarkdown } from './markdown'
import { resolveAuthors } from './github'
import { resolveConfig } from './config'
import { parseCommits } from './parse'

export async function generate(options: ChangelogOptions) {
  const resolved = await resolveConfig(options)

  const rawCommits = await getGitDiff(resolved.from, resolved.to, resolved.includePaths)
  const commits = parseCommits(rawCommits, resolved)
  if (resolved.contributors)
    await resolveAuthors(commits, resolved)
  const md = generateMarkdown(commits, resolved)

  return { config: resolved, md, commits }
}

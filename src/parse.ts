import { notNullish } from '@antfu/utils'
import { parseGitCommit } from '@stephenhebert/changelogen'
import type { GitCommit, RawGitCommit } from '@stephenhebert/changelogen'
import type { ChangelogenOptions } from './types'

export function parseCommits(commits: RawGitCommit[], config: ChangelogenOptions): GitCommit[] {
  return commits.map(commit => parseGitCommit(commit, config)).filter(notNullish)
}

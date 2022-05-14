# Welcome to the Git Connected contributing guide

Thank you for investing your time in contributing to our project! Any contribution you make will be reflected on the [README](https://github.com/wil-gerard/git-connected#readme) :sparkles:.

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

Use the table of contents icon <img src="https://user-images.githubusercontent.com/74286884/168380368-d5d0a971-37a5-4107-b479-671150aa002f.png" width="25" height="25" /> on the top left corner of this document to get to a specific section of this guide quickly.

## New contributor guide

To get an overview of the project, read the [README](README.md). Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Getting started

 Check to see what [types of contributions](https://allcontributors.org/docs/en/emoji-key) we accept before making changes. Some of them don't even require writing a single line of code ✨.

### :mega: Discussions
Discussions are where we have conversations.

If you'd like help troubleshooting a PR you're working on, have a great new idea, or want to share something amazing you've learned in our project, join us in [discussions](https://github.com/wil-gerard/git-connected/discussions).

### :lady_beetle: Issues
[Issues](https://github.com/wil-gerard/git-connected/issues) are used to track tasks that contributors can help with. If an issue has a triage label, we haven't reviewed it yet and you shouldn't begin work on it.

#### Create a new issue

If you've found something in the docs or the web app that should be updated, search [open issues](https://github.com/wil-gerard/git-connected/issues) to see if someone else has reported the same thing. If it's something new, open an issue using a [template](https://github.com/wil-gerard/git-connected/issues/new/choose). We'll use the issue to have a conversation about the problem you want to fix or project you want to work on.

#### Solve an issue

Scan through our [existing issues](https://github.com/wil-gerard/git-connected/issues) to find one that interests you. You can narrow down the search using `labels` as filters. View the [labels](https://github.com/wil-gerard/git-connected/labels) for more information. If you're interested in working on an issue - post a comment and tag @wil-gerard for the assignment.

### :pencil2: Make Changes Locally

1. We recommend using [VS Code](https://code.visualstudio.com/) as an editor with the [Tailwind IntelliSense Twin Extension](https://marketplace.visualstudio.com/items?itemName=lightyen.tailwindcss-intellisense-twin) which supports twin.macro.

2. Fork the repository or create a new branch.
    - If you are a **first time contributor**, please fork the repository:
        - Using GitHub Desktop:
            - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
            - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

        - Using the command line:
            - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

    - **Established contributors**, please [create a branch directly from the issue you are working on,](https://github.blog/changelog/2022-03-02-create-a-branch-for-an-issue/) keep it updated with the latest commits and submit a pull request when ready.

3. See the [installation and setup guide](https://github.com/wil-gerard/git-connected#installation-and-local-development).

4. Create a working branch referencing issue # and title you're working on. Example: `155-contribution-guide` 

5. Start editing code!

### :scroll: Commit your update

We follow the specifications for [Convential Commits.](https://www.conventionalcommits.org/en/v1.0.0/) A quick helpful overview:
- The commit structure must include a type and a brief description followed by an optional body message with details. Tip: to make a git commit with a subject and body `git commit -m "this is the subject" -m "this is the body"`
- Reference issues and pull requests liberally
- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")

 Commit sample:

`refactor(Navbar.tsx): logout redirect (#132)

use navigate function to return to / route`

### :hammer_and_wrench: Pull requests

A [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) is a way to suggest changes in our repository. When we merge those changes, they should be deployed to the live site within 24 hours.

When you're finished with the changes, create a pull request, also known as a PR.
- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request. 
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
- Request @wil-gerard to review
Once you submit your PR, a team member will review your proposal. We may ask questions or request for additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) to help you resolve merge conflicts and other issues.

### :tada: Your PR is merged!

Congratulations :tada::tada: The Git Connected team thanks you :sparkles:. 

Once your PR is merged, your contributions will be publicly visible on the [README docs](https://github.com/wil-gerard/git-connected#contributors).
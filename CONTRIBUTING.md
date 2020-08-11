# Contributing to Scribbletune

Thank you for your interest in contributing to Scribbletune! The goal of this document is to provide an overview of how to get involved.

## Reporting Issues

Identified a reproducible problem in Scribbletune? We're listening! Here are some things to bear in mind when reporting issues.

### Look For an Existing Issue

Before you create a new issue, please do a search in [open issues](https://github.com/scribbletune/scribbletune/issues) to see if the issue or feature request has already been filed.

If you find your issue already exists, make relevant comments and add your [reaction](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments). Use a reaction in place of a "+1" comment:

- 👍 - upvote
- 👎 - downvote

If you cannot find an existing issue that describes your bug or feature, create a new issue using the guidelines below.

### Writing Good Bug Reports and Feature Requests

File a single issue per problem and feature request. Do not enumerate multiple bugs or feature requests in the same issue.

Do not add your issue as a comment to an existing issue unless it's for the identical input. Many issues look similar, but have different causes.

The more information you can provide, the more likely someone will be successful at reproducing the issue and finding a fix.

Please include the following with each issue if possible:

- Version of Scribbletune

- Your operating system

- Reproducible steps (1... 2... 3...) that cause the issue

- What you expected to see, versus what you actually saw

- Images, animations, or a link to a video showing the issue occurring

- A code snippet that demonstrates the issue or a link to a code repository the developers can easily pull down to recreate the issue locally

  - **Note:** Because the developers need to copy and paste the code snippet, including a code snippet as a media file (i.e. .gif) is not sufficient.

### Final Checklist

Please remember to do the following:

- #### Search the issue repository to ensure your report is a new issue

- #### Simplify your code around the issue to better isolate the problem

Don't feel bad if developers can't reproduce the issue right away. They will simply ask for more information!

## Contributing Fixes

If you are interested in writing code to fix issues then read on for information on how we'd like you to contribute!

### Unit Tests

It's important that all new code is covered by unit tests. It is also important that these tests are properly testing the new behaviour.

Tests are written using jest and should be named in the following way:
A unit test that tests the class 'newClass.ts' should be named 'newClass.spec.ts'.

If the piece of work that you are adding is large then integration tests are welcomed as long as they are succinct and performant.

### Browser Support & Functional Testing

Scribbletune can be used both offline via Node.js as well as in the browser, via Tone.js. It is important that any new functionality is compatible with both of these.

In exceptional cases where this is not possible you should clearly state this, with some reasoning, in the pull request.

For features available in the browser, some functional tests are available in `dist/index_test.html` (using the script `dist/script_test.js`). Those tests are not automated and should be run manually one by one. If you fix or add a browser-based feature, please add a functional test in `dist/script_test.js`.

### Meeting the Issue Criteria

It's good to ask yourself "does this achieve what is being suggested in the issue?". If it's a bug fix then is the bug truly fixed? If it's some new functionality then have you delivered what is being asked?

## Don't Be Afraid!

No issue or contribution will be met with any negativity. If you're thinking about getting involved then go for it! No one will be mad if you don't do it perfectly.

# Thank You!

Your contributions to open source, large or small, make great projects like Scribbletune possible. Thank you for taking the time to contribute and to read this guide.

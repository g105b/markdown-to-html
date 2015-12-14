# Contributing.

Firstly, thank you for reading this document. The fact you're hear means that you have an interest in helping an open source project grow. Let's try and get you started as painlessly as possible.

## Testing.

Before a feature is implemented, a test case should be written to describe _how_ the feature _should_ work. Test cases for this project consist of simply two files:

1. Markdown source file: an example file consisting of source Markdown text that will be used to describe the feature that is being implemented.
2. HTML test file: a file containing the expected result of parsing the Markdown source file.

Unit tests are written using [tape]. The test runner file loops over all files within the Markdown.mdtest directory.

Within the Markdown.mdtest directory are multiple `.md` and `.html` files with matching names. The contents of each `.md` file will be parsed and compared with the `.html` counterpart.

Run the tests by executing:

```
node test/testRunner.js
```

## The process of fixing a bug or implementing a new feature.

It is likely that bugs will be found in the way this project parses a certain Markdown elements, even though a passing test is in place.

The recommended procedure for fixing a bug or implementing a new feature is as follows:

1. **Identify** the bug/feature using Github's issue tracker. Search the issue tracker in case someone has already identified this particular issue. If you are the first, create a new issue and describe the issue as concisely as possible.
2. If you choose to, write a test that articulates and the issue perfectly. This test will **isolate** the issue by failing, and will be used to know when the issue is resolved. To write the test, fork the repository to your own Github account and commit the test files, mentioning the issue that the test identifies (see commit messages below).
3. If you choose to, attempt to **implement** a fix to the source JavaScript. If you run the tests each time you change the code, you will know when the issue is fixed, but also you will be confident that your contributions are not in fact breaking other features by accident.
4. Once all tests are passing, create a pull request to the original repository. This will alert the maintainers that you have fixed an issue. Automatic tests will be run to ensure tests are passing in an isolated environment, after which project maintainers will check the exact code that you are contributing. Communication will be made within Github on the Pull Request's page.
5. Once the pull request is merged back into the original repository, your contribution will be live to the world. Well done and thank you for being a part of the open source community.

## Commit messages.

When you have changed the code within a project, you need to commit the code to the repository. This should be done once for every isolated change that is being made. For example, in a typical bug fix there will be two commits: one to isolate the bug by adding tests, and one to implement the bug fix. Both of these commit messages should describe exactly what they are doing, and should reference the Github issue by its number.

Good commit messages:

* `Test #123 what happens when run inside virtual machine.`
* `Fix #123 crash when run inside virtual machine.`
* `Test #456 special unicode characters break build.`
* `Fix #456 handle unicode output in test runner.`
* `Test #789 HTML should output Chinese characters`
* `Close #789 handle Chinese characters properly`

Note that all commit messages follow these criteria:

* Less than 50 characters long.
* Written in present tense. ("Test this, fix that" rather than "Tests this, fixes that").
* References the issue by ID, directly after the first verb. This style is used by Github to automatically close the issue when the commit makes its way back to the `master` branch.

[tape]: https://github.com/substack/tape
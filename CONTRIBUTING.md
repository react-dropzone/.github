# Contributing

🎉 First of all, thanks for taking the time to contribute! We really appreciate it! 🎉

The following is a set of guidelines for contributing to React Dropzone and its packages, which are hosted in the [React Dropzone Organization](https://github.com/react-dropzone) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct
This project and everyone participating in it is governed by the [React Dropzone Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to rolandjitsu@gmail.com.

## Packages
React Dropzone is an open source project made out of a few packages/repositories.
And each has a different responsibility:
1. [react-dropzone](https://github.com/react-dropzone/react-dropzone) - hosts the dropzone functionality
2. [file-selector](https://github.com/react-dropzone/file-selector) - hosts the logic to get the files from the drop or select events
3. [attr-accept](https://github.com/react-dropzone/attr-accept) - hosts the logic to validate the type of file

## How Can I Contribute?

### Bug Reports
This section guides you through submitting a bug report for React Dropzone. Following these guidelines helps maintainers and the community understand your issue, reproduce the behavior, and find related issues.

**NOTE**: If you find a closed issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before you submit an issue
* Check https://react-dropzone.js.org/ and try some of the examples there; if everything is working as expected, there's a good chance the issue is specific to your environment so you may want to spend some time debugging.
* Check the [discussions](https://github.com/react-dropzone/react-dropzone/discussions) for a list of common questions and problems; you may find the answer there; if you think the issue you have is more of a question, then feel free to create a new thread.
* Determine [which repository](#packages) the problem should be reported in.
* Perform a [search](https://github.com/search?q=is%3Aissue+user%3Areact-dropzone) to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

#### Submit an Issue
If you've already been through the above checklist and you're certain there's an issue, then please go ahead and create an issue of type bug and provide the following information by filling in the template.

Explain the problem and include additional details to help maintainers reproduce the problem:
* Use a clear and descriptive title for the issue to identify the problem.
* Describe the exact steps which reproduce the problem in as many details as possible. When listing steps, don't just say what you did, but explain how you did it.
* Provide specific examples to demonstrate the steps. Provide a [codesandbox example](https://codesandbox.io/s/react-dropzone-example-jq6d5?file=/src/App.js), include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [markdown code blocks](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#quoting-code).
* Describe the behavior you observed after following the steps and point out what exactly is the problem with that behavior.
* Explain which behavior you expected to see instead and why.
* Include screenshots and animated GIFs which show you following the described steps and clearly demonstrate the problem.
* If the problem wasn't triggered by a specific action, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:
* Can you reproduce the problem on https://react-dropzone.js.org/ or the [codesandbox example](https://codesandbox.io/s/react-dropzone-example-jq6d5?file=/src/App.js)?
* Did the problem start happening recently (e.g. after updating to a new version) or was this always a problem?
* If the problem started happening recently, can you reproduce the problem in an older version? What's the most recent version in which the problem doesn't happen?
* Can you reliably reproduce the issue? If not, provide details about how often the problem happens and under which conditions it normally happens.
* Does the problem happen for all files? Does the problem happen only when working with files of a specific type, with large files or files with very long lines, or with files in a specific encoding? Is there anything else special about the files you are using?

Include details about your configuration and environment:
* Which version of react-dropzone are you using?
* What's the name and version of the OS you're using?
* What's the name and version of the browser you're using?

### Enhancement Suggestion
This section guides you through submitting a enhancement suggestion, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please include as many details as possible. Fill in the template, including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion
* Check if you're using the latest version of react-dropzone; the feature you're looking for may already be there
* Make sure that what you're proposing is supported in most recent versions of browsers
* Determine [which repository](#packages) the problem should be reported in.
* Perform a [search](https://github.com/search?q=is%3Aissue+user%3Areact-dropzone) to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit An Enhancement Suggestion?
Create an issue of type feature and provide the following information by filling in the template:
* Use a clear and descriptive title for the issue to identify the suggestion.
* Provide a step-by-step description of the suggested enhancement in as many details as possible.
* Provide specific examples to demonstrate the steps. Provide a [codesandbox example](https://codesandbox.io/s/react-dropzone-example-jq6d5?file=/src/App.js) if possible, include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [markdown code blocks](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#quoting-code).
* Describe the current behavior and explain which behavior you expected to see instead and why.
* Include screenshots and animated GIFs which show you following the described steps and clearly demonstrate the problem.
* Explain why this enhancement would be useful to most users and isn't something that can or should be implemented as a community wrapper or plugin.
* List some other applications or libs where this enhancement exists.

### Your First Code Contribution
Unsure where to begin contributing to react-dropzpne? You can start by looking through the [current issues](https://github.com/react-dropzone/react-dropzone/issues) and see if there's anything that you can help with.

#### Local Development
To get started with fixing or enhancing [react-dropzone](https://github.com/react-dropzone/react-dropzone), you need to:
1. Clone [react-dropzone](https://github.com/react-dropzone/react-dropzone.git) on your local workstation
2. Install the dependencies with `yarn install`
3. Run the dev server with `yarn start`
4. Run the unit tests in watch mode with `yarn test:watch`
5. Start hacking

### Pull Requests
Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in the template.
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing

## Testing
Make sure to test the changes you make locally before you submit a pull request. You can simply do that with a `yarn test` or `yarn test:cov`.

If you make significant changes (fix a bug, add a feature, etc), make sure that your code is covered (the rule of thumb is that coverage should be the same or higher). So add as many tests as necessary to ensure that whatever changes were made there's test cases to check the expected outcome.

## Styleguides

### Git Commit Messages
* Please follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) spec for your commit messages; this is also necessary for our auto release process to work correctly
* If, during `yarn install`, the githooks were not setup properly, do run `yarn commitmsg` to ensure the correctness of you commit message
* Use present tense; so `add awesome feature` instead of `adding awesome feature`
* Use the imperative mood (e.g `add` instead of `adds`)
* Reference the issues the commit is addressing, if there is an issue; see [linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)
* When making pull requests, do make sure to have a reasonable amount of commits (a good rule of thumb should be at most 5) and that all commits are addressing the same theme/topic
* Avoid unnecessary code format changes, unless you're specifically working on that; these sort of changes just make it difficult to compare changes when reviewing pull requests 

### JavaScript Styleguide
All JavaScript code is linted with [eslint](https://eslint.org/) and [prettier](https://prettier.io/).
So just run `yarn lint:fix` to make sure the changes you made follow the styleguide.

### Specs Styleguide
* Include thoughtfully-worded, well-structured [Jasmine](https://jasmine.github.io/)/[Jest](https://jestjs.io/) specs in the ./spec folder.
* Treat `describe` as a noun or situation.
* Treat `it` as a statement about state or how an operation changes state.

Example
```js
describe("a dog", () => {
  it("barks", () => {
    // ...
  });
  describe("when the dog is happy", () => {
    it("wags its tail", () => {
      // ...
    });
  });
});
```

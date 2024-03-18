# Project Introduction

This repository is a monorepo containing three projects:

* **api-client** - communicates with a backend;
* **composables** - exposes composable functions used to retrieve data using `api-client` and to map them to universal data formats using `getters`;
* **theme** - `nuxt` project that glues everything together. It extends our core theme and uses `composables` to retrieve data.

## Release Notes

| Name | Version |
|---------|--------------|
| Travel Buddy     | 1.0.0   |


## Installation/Setup Guide
1. Change all `@vue-storefront/beckn` strings to your integration name (eg `@vue-storefront/super-ecomm`)

2. Install all required dependencies:

```sh
yarn install
```

3. (optional) Then you can verify if everything works properly by building all three projects:

```sh
yarn build
```

4. If everything built properly, you can start creating your new integration with:

```sh
yarn dev
```
5. You can install pm2 to start in background to run production build..
```sh
sudo yarn add pm2
pm2 start "yarn start" --name taxibap
```

## Usage
<img width="1152" alt="Screenshot 2024-03-18 at 5 50 52 PM" src="https://github.com/beckn/mobility-bap-france-experience/assets/104425465/e1386233-e23c-4421-ab5d-f687300553c2">

## Link to Experience Center

[Travel Buddy](https://experience-guide-staging.becknprotocol.io/cities)

## Contributing guidelines

1. Fork the repository in your repository.
2. Clone the forked repository to your local machine.
3. Create a new branch for your contribution: `git checkout -b feature/your-feature-name`
4. Make your changes and commit them: `git commit -m "Your commit message"`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Submit a pull request to the main repository.

### Code Style and Standards

- Follow the coding style and standards used in the project.
- Use meaningful variable and function names.
- Write clear and concise comments when necessary.
- Ensure your code is well-documented.

### Testing

- Ensure your changes pass all existing tests.
- Write additional tests if necessary to cover your changes.
- Run the test suite before submitting a pull request.

### Reporting Bugs

If you find a bug, please report it by opening an issue on GitHub. Include as much detail as possible, such as the steps to reproduce the bug and your environment details.

### Feature Requests

If you have an idea for a new feature or improvement, feel free to open an issue to discuss it. Provide a clear description of the feature and why it would be beneficial.

### Pull Request Guidelines

- Provide a clear and descriptive title for your pull request.
- Include a detailed description of the changes you've made.
- Reference any related issues in your pull request.
- Ensure your code is properly tested.

![banner](https://user-images.githubusercontent.com/74286884/156848307-b77026a3-36f3-4e82-bc90-4721ddd1d996.svg)


# GitConnected

GitConnected is a social networking application that allows software engineers to reciprocate connections, follows, and endorsements - built by and for the [100Devs](https://leonnoel.com/100devs/) community.

### Architecture

#### Frontend

  - TypeScript
  - React
  - Axios
  - Tailwind CSS

#### Backend

  - TypeScript
  - Node
  - Express
  - MongoDB
  - Passport
  - Discord OAuth
  - GitHub OAuth
  - Twitter OAuth

### Features

User login that only allows members of the 100devs Discord server. Connect your GitHub, Twitter, and LinkedIn accounts.

![sign-in](https://user-images.githubusercontent.com/74286884/156219311-52e31316-2435-4e19-bbf0-981c30d9233d.gif)

Users can then follow other 100devs and be followed on all platforms, directly in-app.

![follow](https://user-images.githubusercontent.com/74286884/156219385-920d9663-a2cd-4e8a-9e6f-f17cefcfb3f5.gif)

Future improvements:
- Users can add tags to their profiles (coffee chat, currently employed, looking for work, group project, etc.)
- User search by location and tags
- Group project forum where users can pin GitHub repos

## Development Contributors:

These instructions will get a copy of the project on your local machine for development and testing purposes. If you have any further questions, feel free to reach out to [Wil Gerard.](https://github.com/wil-gerard)

### Prerequisites

* Node v16 or higher
* [Yarn](https://yarnpkg.com/)

### Installing
* Clone repo
`git clone https://github.com/wil-gerard/GitConnected`
* Install NPM modules for **backend** `cd backend` and then `yarn install`
* Install NPM modules for **client** `cd client` and then `yarn install`
* Create an .env file with your own environment variables:

### .env
Expects a .env file in the root directory of **backend** with environment variables. If you're unsure what that means, locate our template **.envTEMPLATE**, delete "TEMPLATE" from the filename, plug in your environment variables, and save.

### Running locally

#### Frontend
* Navigate to root directory of **client** in your terminal `cd client` and then `yarn start`

#### Backend
* Navigate to root directory of **backend** in your terminal `cd backend` and then `yarn dev`

## Code of Conduct

Please read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details

## Authors
  - **Wil Gerard** - *Software Engineer* - [wil-gerard](https://github.com/wil-gerard)
  - **Ken aka Frosty** - *Software Engineer* - [KenAKAFrosty](https://github.com/KenAKAFrosty)
  - **Jeff Bucher** - *Software Engineer* - [JeffBucherDev](https://github.com/JeffBucherDev)
  - **Billie Thompson** - *Provided README Template* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of
[contributors](https://github.com/wil-gerard/GitConnected/contributors)
who participated in this project.

## License

MIT License - see the [LICENSE.md](LICENSE.md) file for details

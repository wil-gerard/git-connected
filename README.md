# ** *(The application and following readme is currently a WIP)* **
# GitConnected

GitConnected is a social networking application that allows software engineers to reciprocate connections, follows, and endorsements - built by and for the [100Devs](https://leonnoel.com/100devs/) community.

## Development Contributors:

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes.

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
Expects a .env file in the root directory of **backend** with environment variables. If you're unsure what that means, locate our template **.envSTRUCTURE**, delete "TEMPLATE" from the filename, plug in your environment variables, and save.

### Running locally

#### Frontend
* Navigate to root directory of **client** in your terminal `cd client` and then `yarn start`


#### Backend
* Navigate to root directory of **backend** in your terminal `cd backend` and then `yarn dev`

## Style, Design, And Architecture

### Preview

![gitconnected-preview](https://user-images.githubusercontent.com/74286884/150421227-2662285d-11bf-421f-b9d8-f094a8b449d0.png)

### Built With

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
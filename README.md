# Image-Processing-Api

> ### An API that resizes images on the fly.

# Getting started

To get API running locally:

- Clone this repo
- `npm i` to install all required dependencies
- `npm run start` to run the compiled code

# List of available commmands

- `npm run build` to transpile the ts code into js
- `npm run lint` to lint the code
- `npm run lint:f` to fix the autofixable lint errors
- `npm run test` to run all the tests
- `npm run start` to run the compiled code
- `npm run dev` to run the ts modules using nodemon

# API endpoint
> ### /api/images/resize?filename=[image-name]&width=[width]&height=[height]
- Method: GET
- Params: `filename` the name of the image to be resized, `width` `height` the dimensions of the new image in pixels

```
Example: http://localhost:5000/api/images/resize?filename=upwork&width=500&height=500
```
# Available Images
- `upwork`

# Built with
- [NodeJs](https://nodejs.org/en/) - Javascript Runtime
- [Express](https://expressjs.com/) - Web Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language

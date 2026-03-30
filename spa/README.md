# <span style="color: #FF7900"> How to setup a .env for the template</span>

To properly run this project on your local machine, you are require to fill up the `.env` with your own local information.
There is in this folder a `.env.example` that you can use as a guide for a proper `.env` creation, but this README also will guide you through the process.

## <span style="color: #A885D8">API Connection

All of the variables used by default on the SPA are used to make the API requests.

There are 3 of them: `REACT_TOKEN`, `REACT_SERVER` and `REACT_PORT`.

The `REACT_TOKEN` variable is, actually, a dummy variable that will be used for storing the jwt token on the client-side.

The other two variables are, respectively, the IP and Port where the API is listening (by default, it uses `localhost:3000`, so that's why on the example it's the default value.)

You can set them like this:

```sh
REACT_TOKEN="{SOME_RANDOM_STRING}"

REACT_SERVER="127.0.0.1"
REACT_PORT=3000
```

# <span style="color: #A885D8">How can I reach you to get support with this project?

If you need help with this project or to discuss the use of one technology over another, you can email me with:

- arthur-illa@hotmail.com

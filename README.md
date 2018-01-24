# http-nextra

Nobody was happy with [express](https://www.npmjs.com/package/express), [restify](https://www.npmjs.com/package/restify) nor with [koa](https://www.npmjs.com/package/koa) because in JS, we lack of a standard library. So [let's push another](https://xkcd.com/927/).

Unlike the three aforementioned libraries, this one is **very low level** and has no dependencies. Then, what is this for? Purely to have an API, it's designed for that and for nothing else. Using `http` is a pain so I took some time to implement my own router to make it much less tedious to use.

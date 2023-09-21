const dotenv = require('dotenv');  //一般会配置.env 文件储存密匙信息。 但是上传 git 的时候会把它忽略掉(配置环境变量)

//const dotenv = require('dotenv').config(); 如果有config 的话, 意思就是在当前默认的根项目下寻找.env文件里面的配置
//为什么.env 文件不上传 github: 是因为.env存放私密信息， 包括开发时候的API key, 如果API key被盗了别人就可以使用你的API



if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

/**
 * 组件导入的顺序:
 * - 会把第三方的库放上面
 * - 然后把自己写的库放下面
 */

const swaggerUi = require('swagger-ui-express');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
// const cors = require('./middleware/cors');
const router = require('./routes');
const swaggerJsDoc = require('./utils/swagger');
const createLogger = require('./utils/logger');
// const logger = createLogger('index.js');
const logger = require('winston')
const PORT = process.env.PORT || 3000; // 通过这行代码就能取出环境变量的信息(3000在开发的时候可传可不传， 但是在生产环境下必须指定)

/**
 * 如果是unix 和 linux 系统可以不用cross-env这个库，window 下就必须在package.json里面写：
 *    cross-env NODE_ENV=production nodemon src/index.js
 * 
 * .env文件名不是固定的, 如果修改了只需要在 config()里面标明路径就可以
 * pakage.json 里面:  cross-env NODE_ENV=production nodemon src/index.js
 * 
 * NODE_ENV 是固定的， 但是production不是， 
 * 
 * 
 * 
 * 
 * 
 */

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
    stream: logger.stream,
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));
app.use(router);

app.listen(PORT, (err) => {
  if (err) logger.error(err);

  logger.info(`server listening on port ${PORT}`);
});

// logging level
// debug
// info
// warn
// error

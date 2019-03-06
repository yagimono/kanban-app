// Node.jsのrequireスタイルでインポート
const bodyParser = require('body-parser')

// `Express`アプリケーションインスタンスを受け取る関数をエクスポート
module.exports = app => {
    // HTTPリクエストのbodyの内容をJSONとして解析するようミドルウェアをインストール
    app.use(bodyParser.json())

    // ユーザ情報
    const users = {
      'foo@domain.com': {
        password: '12345678',
        userId: 1,
        token: '1234567890abcdef'
      }
    }

    // ログインAPIのエンドポイント'/auth/login'
    app.post('/auth/login', (req, res) => {
      const { email, password } = req.body
      const user = users[email]
      if (user) {
        if (user.password !== password) {
          res.status(401).json({ message: 'ログインに失敗しました。' })
        } else {
          res.json({ userId: users.userId, token: user.token })
        }
      } else {
        res.status(404).json({ message: 'ユーザが登録されていません。' })
      }
    })
}
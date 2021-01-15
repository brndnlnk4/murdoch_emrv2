module.exports = {
  k: (async () => {
    const res = () => new Promise(function(resolve, reject) {

    });

    await res
  }),

  $db_options: {
    host: 'localhost',
    port: 3306,
    database: 'murdoch_emr',
    user: 'root',
    password: '',
    connectionLimit: 55
  },

  $session_options:  ($session_driver=null) => ({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: $session_driver,
    resave: false,
    saveUninitialized: false
  }),
}

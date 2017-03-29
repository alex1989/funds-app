# The Fund Statistic App #

## Create vitualenv ##

```
$ virtualenv -p /usr/bin/python3 env
$ source env/bin/activate
```

## Install vitualenv ##

```
$ pip install -r requirements
$ cd app
$ bower install
```

## Instialize application ##

```
$ ./manage.py migrate
$ ./manage.py loaddata initial
$ ./manage.py runserver
```
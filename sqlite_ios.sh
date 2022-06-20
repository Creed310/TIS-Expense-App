#!/bin/bash

open_database() {
    DB_PATH=`lsof -Fn -p $PID| grep "\.sqlite$"`
    open ${DB_PATH:1}
}

PID=`pgrep $1`

if [ -z "$1" ]
then
    echo "Are you sure you have your app opened on a simulator? 🤔";
else
    open_database $PID
fi
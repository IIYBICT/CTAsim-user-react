create table if not exists activate_email
(
    id          int auto_increment
        primary key,
    username    varchar(255) null,
    email       varchar(255) null,
    sjs         varchar(255) null,
    is_activate int          null,
    expire_time datetime     null
)
    engine = MyISAM
    charset = utf8mb3;

create table if not exists change_email
(
    id          int auto_increment
        primary key,
    email       varchar(255) null,
    username    varchar(255) null,
    sjs         varchar(255) null,
    expire_time datetime     null
)
    engine = MyISAM
    charset = utf8mb3;

create table if not exists user_group
(
    id         int auto_increment
        primary key,
    group_name varchar(255) null,
    is_admin   int          null
)
    engine = MyISAM
    charset = utf8mb3;

create table if not exists user_session
(
    id          int auto_increment
        primary key,
    username    varchar(255) null,
    token       varchar(255) null,
    login_time  datetime     null,
    expire_time datetime     null
)
    engine = MyISAM
    charset = utf8mb3;

create table if not exists users
(
    id              int auto_increment
        primary key,
    user_call       varchar(11)  null,
    username        varchar(255) null,
    password        varchar(255) null,
    group_id        int          null,
    email           varchar(255) null,
    qq              varchar(12)  null,
    register_time   datetime     null,
    last_login_time datetime     null,
    constraint users_id_uindex
        unique (id)
);


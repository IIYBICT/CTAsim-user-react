create table activate_email
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

create table change_email
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

create table rail_activity
(
    id             int auto_increment
        primary key,
    rail_name      varchar(255) null comment '活动名称',
    stage          varchar(255) null comment '活动期号',
    activity_time  datetime     null comment '活动时间',
    line           varchar(255) null comment '使用线路',
    section        varchar(255) null comment '活动区间',
    activity_start varchar(255) null comment '始发站',
    activity_end   varchar(255) null comment '终到站',
    ioco_ask       varchar(255) null comment '机车要求',
    bottom_ask     varchar(255) null comment '车底要求',
    go_explain     text         null comment '进入说明',
    dispatch       varchar(255) null comment '调度',
    ip_port        varchar(255) null comment 'IP端口',
    other_explain  text         null comment '其他说明',
    add_time       datetime     null comment '发布时间',
    state          int          null comment '活动状态'
)
    engine = MyISAM
    charset = utf8mb3;

create table rail_activity_user
(
    id           int auto_increment
        primary key,
    rail_name    varchar(255) null,
    username     varchar(255) null,
    activity_id  int          null,
    bus_type     varchar(255) null,
    ioco_type    varchar(255) null,
    bottom_type  varchar(255) null,
    bus_length   varchar(255) null,
    bus_sum      varchar(255) null,
    rail_explain varchar(255) null,
    sign_time    datetime     null
)
    engine = MyISAM
    charset = utf8mb3;

create table test
(
    sss json null
);

create table user_group
(
    id         int auto_increment
        primary key,
    group_name varchar(255) null,
    is_admin   int          null
)
    engine = MyISAM
    charset = utf8mb3;

create table user_rail
(
    id            int auto_increment
        primary key,
    username      varchar(255) null,
    rail_name     varchar(255) null,
    state         int          null,
    activity_sum  int          null,
    connect_sum   int          null,
    register_time datetime     null
)
    engine = MyISAM
    charset = utf8mb3;

create table user_session
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

create table users
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


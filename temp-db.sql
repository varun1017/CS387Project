create table users
    (
        user_id      varchar(9) not null unique,
        email   varchar(30) not null unique,
        hashed_password    varchar(80),
        user_name    varchar(20) not null,  
        ph_num   varchar(10) not null CHECK (ph_num ~ '^[0-9]{10}$'),
        user_address    varchar(100),
        primary key (user_id)
    );

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

create table products
    (
        prod_id      SERIAL,
        seller_id    varchar(9) not null,
        prod_name    varchar(20) not null,
        prod_desc   varchar(100) not null,
        category_name VARCHAR(30) NOT NULL,
        buyer_id    varchar(9) default null,
        price       varchar(7) not null,
        prod_expdate timestamp,
        product_image bytea,
        created_at   timestamp default now(),
        primary key (prod_id),
        foreign key(seller_id) references users(user_id),
        foreign key(buyer_id) references users(user_id)
    );

create table product_requests
    (
        prod_req_id SERIAL,
        product_id INTEGER,
        seller_id varchar(9),
        buyer_id varchar(9),
        primary key(prod_req_id),
        foreign key(product_id) references products(prod_id),
        foreign key(seller_id) references users(user_id),
        foreign key(buyer_id) references users(user_id)
    );

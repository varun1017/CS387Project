create table user
    (
        ID      varchar(9) not null unique,
        email   varchar(30) not null unique,
        hashed_password    varchar(80),
        name    varchar(20) not null,  
        ph_num   varchar(10) CHECK (ph_num ~ '^[0-9]{10}$'),
        user_address    varchar(100),
        primary key (ID)
    );

create table category (
    category_id SERIAL,
    name VARCHAR(30) NOT NULL,
    primary key(category_id)
);


create table product
    (
        ID      varchar(5),
        seller_id    varchar(9),
        name    varchar(20) not null,
        description    varchar(100),
        category_id INTEGER,
        buyer_id    varchar(9),
        price       varchar(7),
        expiry_date varchar(20),
        product_images JSON CHECK (JSON_LENGTH(product_images) <=6),
        primary key (ID),
        foreign key(seller_id) references user(ID),
        foreign key(category_id) references category(category_id),
        foreign key(buyer_id) references user(ID)
    );

create table product_requests
    (
        ID SERIAL,
        product_id varchar(5),
        seller_id varchar(9),
        buyer_id varchar(9),
        primary key(ID),
        foreign key(product_id) references product(ID),
        foreign key(seller_id) references user(ID),
        foreign key(buyer_id) references user(ID)
    );

create table chat_message
    (
        ID SERIAL,
        sender_id VARCHAR(9) NOT NULL,
        receiver_id VARCHAR(9) NOT NULL,
        message TEXT NOT NULL,
        sent_at TIMESTAMP NOT NULL DEFAULT NOW(),
        primary key(ID),
        foreign key(sender_id) references user(ID),
        foreign key(receiver_id) references user(ID)
    );

create table product_chat_message
    (
        product_id VARCHAR(5) NOT NULL,
        chat_message_id INTEGER NOT NULL,
        is_seller_chat BOOLEAN NOT NULL,
        PRIMARY KEY (product_id, chat_message_id),
        foreign key(product_id) references product(ID),
        foreign key(chat_message_id) references chat_message(ID)
    );


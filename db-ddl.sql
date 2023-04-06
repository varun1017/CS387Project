create table user
    (
        ID      varchar(9),
        hashed_password    varchar(80),
        name    varchar(20) not null,  
        ph_num   varchar(10) CHECK (ph_no ~ '^[0-9]{10}$'),
        addr    varchar(100),
        primary key (ID,ph_num)
    );

create table product
    (
        ID      varchar(5),
        owner_id    varchar(9),
        name    varchar(20) not null,
        desc    varchar(100),
        buyer_id    varchar(9),
        price       varchar(7),
        expiry_date varchar(20),
        primary key (ID)
    );

CREATE TABLE product_images
    (
        image_id int not null,
        product_id varchar(5),
        image BLOB,
        primary key(image_id),
        foreign key(product_id) references product(ID)
    );
=========================================================================================
                        ADDING FOREIGN KEY CONSTRAINT 
=========================================================================================

=========================================================================================
# 0. FOREIGN KEY কী?
=========================================================================================
Foreign Key হলো এমন একটি constraint যা এক টেবিলের column কে
অন্য টেবিলের Primary Key বা Unique Key এর সাথে সম্পর্কিত করে।

মূল উদ্দেশ্য:
- Referential Integrity বজায় রাখা
- Parent টেবিলে না থাকা ডাটা Child টেবিলে ঢুকতে না দেওয়া
- Database কে logically correct রাখা

=========================================================================================
# 1. PARENT & CHILD TABLE CONCEPT
=========================================================================================

Parent Table:
- যেই টেবিলের Primary Key কে reference করা হয়

Child Table:
- যেই টেবিলে Foreign Key থাকে

=========================================================================================
# 2. EXAMPLE SCENARIO
=========================================================================================

Parent Table: users
Primary Key: id

Child Table: orders
Foreign Key: user_id → users(id)

=========================================================================================
# 3. EXISTING TABLE এ FOREIGN KEY ADD করা
=========================================================================================

SYNTAX:

ALTER TABLE child_table_name
ADD CONSTRAINT constraint_name
FOREIGN KEY (child_column)
REFERENCES parent_table(parent_column);

=========================================================================================
# 4. PRACTICAL EXAMPLE
=========================================================================================

users টেবিল:

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

orders টেবিল (Foreign Key ছাড়া):

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount NUMERIC(10,2)
);

এখন Foreign Key add করা:

ALTER TABLE orders
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id)
REFERENCES users(id);

=========================================================================================
# 5. ON DELETE & ON UPDATE RULES
=========================================================================================

Foreign Key এর সাথে আমরা behavior define করতে পারি:

ON DELETE:
- CASCADE
- SET NULL
- RESTRICT
- NO ACTION
- SET DEFAULT

ON UPDATE:
- CASCADE
- RESTRICT
- NO ACTION
- SET NULL

=========================================================================================
# 6. ON DELETE CASCADE EXAMPLE
=========================================================================================

ALTER TABLE orders
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;

ব্যাখ্যা:
users টেবিল থেকে কোনো user delete হলে,
তার সাথে সম্পর্কিত orders গুলোও automatic delete হবে

=========================================================================================
# 7. ON DELETE SET NULL EXAMPLE
=========================================================================================

ALTER TABLE orders
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE SET NULL;

শর্ত:
child column অবশ্যই NULL allow করতে হবে

=========================================================================================
# 8. MULTIPLE FOREIGN KEY ADD করা
=========================================================================================

ALTER TABLE orders
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id)
REFERENCES users(id),
ADD CONSTRAINT fk_orders_product
FOREIGN KEY (product_id)
REFERENCES products(id);

=========================================================================================
# 9. FOREIGN KEY সহ TABLE CREATE করা (BEST PRACTICE)
=========================================================================================

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    amount NUMERIC(10,2)
);

বা advanced version:

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount NUMERIC(10,2),
    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

=========================================================================================
# 10. FOREIGN KEY DROP করা
=========================================================================================

ALTER TABLE orders
DROP CONSTRAINT fk_orders_user;

=========================================================================================
# 11. FOREIGN KEY ERROR COMMON CAUSE
=========================================================================================

1. Parent table এ value নেই
2. Data type mismatch
3. Parent column Primary / Unique না
4. Existing data constraint violate করছে

=========================================================================================
# 12. DATABASE DESIGN BEST PRACTICE
=========================================================================================

- সবসময় meaningful constraint নাম ব্যবহার করো
- Production DB তে CASCADE সাবধানে ব্যবহার করো
- Parent table আগে create করো
- Foreign Key ছাড়া relational system incomplete

=========================================================================================
# 13. SUMMARY
=========================================================================================

Foreign Key:
- Table relationship enforce করে
- Data integrity নিশ্চিত করে
- Real-world relationship represent করে
- Backend API logic কে strong করে

=========================================================================================                                       
                                THE END
=========================================================================================

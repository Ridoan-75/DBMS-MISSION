=========================================================================================
                      THE ANATOMY OF A TABLE OR RELATION 
=========================================================================================

=========================================================================================
# 1. TABLE (RELATION) — কী?
=========================================================================================

Relational database এ একটি Table মানে হলো —  
এক ধরনের "entity" এর ডেটা tabular format এ সংরক্ষণ করা।

Examples:
- Users
- Products
- Orders
- Students


=========================================================================================
# 2. ROW (TUPLE / RECORD)
=========================================================================================

একটি Row মানে হলো — Table এর একেকটা data entry।

Example:
Users Table-এর ১টা Row হতে পারে:
(1, "Ridoan", "ridoan@example.com")


=========================================================================================
# 3. COLUMN (ATTRIBUTE)
=========================================================================================

প্রতিটি Column Table-এর একটি নির্দিষ্ট Property কে নির্দেশ করে।

Example:
Users Table:
id | name | email | age

এখানে id, name, email, age — এগুলো Column/Attribute।


=========================================================================================
# 4. SCHEMA
=========================================================================================

Schema মানে হলো —  
Table-এর structure সম্পর্কে সমস্ত তথ্য:
✔ Column names  
✔ Data types  
✔ Constraints  
✔ Keys (PK, FK, Unique)  
✔ Default values  

Schema = Design / Blueprint of Table


=========================================================================================
# 5. PRIMARY KEY (PK)
=========================================================================================

একটি Column (বা একাধিক Column) যা:
✔ প্রতিটি Row কে uniquely identify করে  
✔ Duplicate হতে পারে না  
✔ NULL হতে পারে না  

Examples:
- id (Auto Increment)
- order_id


-- Example:

id | name
-----------
1  | Ridoan
2  | Sakib


=========================================================================================
# 6. FOREIGN KEY (FK)
=========================================================================================

Foreign Key হলো এমন একটি Column যা অন্য table-এর Primary Key কে reference করে।

✔ Relationship তৈরি করে  
✔ Data integrity রক্ষা করে  

Example:
Orders Table:
order_id | user_id(FK) | amount


=========================================================================================
# 7. CANDIDATE KEY
=========================================================================================

Primary Key candidate হিসেবে যেসব Column eligible—  
এগুলোকে Candidate Key বলে।

Example:
Users Table:
- email (unique)
- phone (unique)
- username (unique)

এগুলোর যেকোনো একটি PK হতে পারতো → তাই Candidate Key।


=========================================================================================
# 8. COMPOSITE KEY
=========================================================================================

যখন ২ বা তার বেশি Column মিলে Primary Key তৈরি হয়।

Example:
OrderItems Table:
(order_id, product_id) → Composite PK


=========================================================================================
# 9. SUPER KEY
=========================================================================================

Super Key হলো এমন যেকোনো Column set যা Row কে uniquely identify করতে পারে।

Example:
- email  
- (email + phone)  
- (id + email)  


=========================================================================================
# 10. UNIQUE KEY
=========================================================================================

Unique Key মানে:
✔ Column-এর মান duplicate হবে না  
✔ কিন্তু NULL থাকতে পারে (RDBMS depending)  

Example:
Users:
email UNIQUE


=========================================================================================
# 11. NULL VALUES
=========================================================================================

NULL মানে ‘কিছু নেই’।  
Value না থাকলে সেই Column এ NULL রাখা হয়।

Example:
age → NULL


=========================================================================================
# 12. DOMAIN
=========================================================================================

Domain = Column এ কী ধরনের value দিতে পারো তার সীমা।

Example:
age column domain = INT(0–150)
email domain = string(valid email format)


=========================================================================================
# 13. DATA TYPE
=========================================================================================

প্রতিটি Column এর একটা Data Type থাকে:

Examples:
INT, VARCHAR, TEXT, DATE, BOOLEAN, FLOAT, TIMESTAMP


=========================================================================================
# 14. DEFAULT VALUE
=========================================================================================

যদি কোনো Column এ value না দেওয়া হয়  
তাহলে ডিফল্ট যে মান বসবে সেটাই default value।

Example:
status DEFAULT 'active'
createdAt DEFAULT CURRENT_TIMESTAMP


=========================================================================================
# 15. CONSTRAINTS
=========================================================================================

Constraint মানে — Column বা Table এর উপর নিয়ম/শর্ত।

Common Constraints:
- PRIMARY KEY  
- FOREIGN KEY  
- UNIQUE  
- NOT NULL  
- CHECK  
- DEFAULT  

Example:
age CHECK (age >= 18)


=========================================================================================
# 16. RELATIONSHIP
=========================================================================================

Tables এর মধ্যে সম্পর্ক কে Relationship বলে।

Types:
1. One-to-One
2. One-to-Many
3. Many-to-Many

Example:
User (1) → (Many) Orders


=========================================================================================
# 17. INDEX
=========================================================================================

Index হলো search speed বাড়ানোর জন্য বিশেষ structure।

Example:
CREATE INDEX idx_email ON users(email);


=========================================================================================
# 18. METADATA
=========================================================================================

Metadata = Data about data  
→ Table তৈরি হয়েছিল কখন  
→ Row count  
→ Column info  
→ Table size  
*

=========================================================================================
# FULL EXAMPLE TABLE STRUCTURE (POSTGRESQL STYLE)
=========================================================================================

CREATE TABLE users (
  id SERIAL PRIMARY KEY,          -- unique identifier
  name VARCHAR(100) NOT NULL,     -- attribute
  email VARCHAR(100) UNIQUE,       -- unique key
  age INT CHECK(age >= 0),        -- domain + constraint
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),  -- foreign key
  amount INT NOT NULL
);


=========================================================================================
# SUMMARY (SUPER SHORT)
=========================================================================================

TABLE = Rows + Columns  
ROW = Actual data  
COLUMN = Field/property  
PRIMARY KEY = Unique identifier  
FOREIGN KEY = Table Relationship  
SCHEMA = Table structure  
CONSTRAINTS = Rules  
RELATION = Table connection


=========================================================================================
                                       THE END
=========================================================================================

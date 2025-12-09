=========================================================================================
                          TYPES OF DATABASE MODELS 
=========================================================================================

=========================================================================================
# 1. HIERARCHICAL DATABASE MODEL
=========================================================================================

এটি ট্রি (Tree) স্ট্রাকচারের মতো কাজ করে।
Parent → Child সম্পর্ক থাকে।

উদাহরণ:
Company
 └── Departments
      └── Employees

✔ High-speed searching  
✔ Simple structure  
✘ Rigid (parent-child ছাড়া অন্য সম্পর্ক করা যায় না)

=========================================================================================
# 2. NETWORK DATABASE MODEL
=========================================================================================

এটি Hierarchical model এর উন্নত সংস্করণ।
এখানে একাধিক parent-child relation করা যায়।  
Structure অনেকটা graph এর মতো।

✔ Complex relationships support করে  
✔ Faster traversal  
✘ জটিলতা বেশি


=========================================================================================
# 3. RELATIONAL DATABASE MODEL (RDBMS)
=========================================================================================

এটি সবচেয়ে জনপ্রিয় Database Model।
ডেটা table আকারে থাকে এবং relation (PRIMARY KEY, FOREIGN KEY) দিয়ে যুক্ত থাকে।

Examples:  
- PostgreSQL  
- MySQL  
- SQLite  
- MariaDB  
- SQL Server  

✔ Easy to understand  
✔ Structured Query Language (SQL) ব্যবহার  
✔ Strong data integrity  


-- Sample Example (Table Structure)

Table: Users
--------------------------------
id (PK) | name     | email
--------------------------------

Table: Orders
--------------------------------
order_id (PK) | user_id (FK) | price
--------------------------------


=========================================================================================
# 4. OBJECT-ORIENTED DATABASE MODEL (OODBMS)
=========================================================================================

এখানে ডেটা Object আকারে রাখা হয়।  
OOP concept (Class, Object, Inheritance) সরাসরি Database এ support করে।

Example:  
- ObjectDB  
- db4o  

✔ Complex data store করা সহজ  
✔ Multimedia data এর জন্য ভালো  


=========================================================================================
# 5. DOCUMENT DATABASE MODEL (NoSQL)
=========================================================================================

এটি JSON-Like Document আকারে ডেটা store করে।  
RDBMS এর মতো fixed schema নেই।

Example:  
- MongoDB  
- CouchDB  

✔ Flexible Schema  
✔ Nested data সহজে রাখা যায়  
✔ Highly scalable


-- Example Document:

{
  "name": "Ridoan",
  "email": "ridoan@example.com",
  "address": {
      "city": "Dhaka",
      "zip": 1205
  }
}


=========================================================================================
# 6. KEY–VALUE DATABASE MODEL (NoSQL)
=========================================================================================

এখানে ডেটা খুব Simple — Key → Value pair আকারে থাকে।

Example:  
- Redis  
- Amazon DynamoDB  

✔ Super fast  
✔ Cache, session management এর জন্য perfect


=========================================================================================
# 7. COLUMNAR DATABASE MODEL (NoSQL)
=========================================================================================

এখানে Rows নয়, Column ভিত্তিক ডেটা store হয়।  
Data warehouse, analytics, big data এ বেশি ব্যবহৃত।

Example:  
- Apache Cassandra  
- Google BigTable  
- Amazon Redshift  

✔ Read-heavy analysis এর জন্য ideal  
✔ High compression  


=========================================================================================
# 8. GRAPH DATABASE MODEL
=========================================================================================

Node + Edge + Relationship structure  
Friendship system, recommendation system, social media graph — এগুলোতে বেশি ব্যবহৃত।

Example:  
- Neo4j  
- ArangoDB  

✔ Complex relationship খুব efficiently store করা যায়  
✔ Perfect for social network, path finding


-- Example:

Node = User
Edge = FOLLOWS
Relation = User1 --follows--> User2


=========================================================================================
# 9. TIME-SERIES DATABASE MODEL
=========================================================================================

Time-based data store করার জন্য ব্যবহার হয়।

Example:
- InfluxDB
- TimescaleDB

✔ IoT data  
✔ Sensor data  
✔ Analytics  


=========================================================================================
# 10. MULTIMODEL DATABASE MODEL
=========================================================================================

একটি Database এ multiple model support করে:
- Document
- Key-value
- Graph
ইত্যাদি একসাথে।

Example:  
- ArangoDB  
- OrientDB  

✔ Flexible  
✔ Different use-cases handle করতে পারে  


=========================================================================================
# SUMMARY TABLE
=========================================================================================

| Model Type        | Example             | Best Use Case                     |
|-------------------|---------------------|-----------------------------------|
| Hierarchical      | IBM IMS             | Tree-like data                    |
| Network           | IDMS                | Complex relationships             |
| Relational        | PostgreSQL, MySQL   | Structured business data          |
| Object-Oriented   | ObjectDB            | OOP-based applications            |
| Document (NoSQL)  | MongoDB             | Flexible JSON-like data           |
| Key-Value (NoSQL) | Redis               | Cache / Sessions / Fast lookup    |
| Columnar          | Cassandra           | Big data analytics                |
| Graph             | Neo4j               | Social networks / relationships   |
| Time-Series       | InfluxDB            | Time-based sensor data            |
| Multimodel        | ArangoDB            | Mixed use-cases                   |


=========================================================================================   
                                    THE END
=========================================================================================

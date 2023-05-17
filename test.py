
import cx_Oracle






try:
    connection = cx_Oracle.connect("Fady/Password@localhost:1521/orcl")
except Exception as err:
        print("Error while trying to connect to Database.")
else:
    cur = connection.cursor()
    print("Successfully connected to oracle Database")


sql = 'SELECT * FROM EMPLOYEES1'
cur.execute(sql)
table = cur.fetchall()

print(table)

import redis

r = redis.Redis(host='127.0.0.1', port='6379')

print(r)

r.set("student1_name", "RAM")
name = r.get("student1_name")
print(name)

name = r.get("student2_name")
print(name)
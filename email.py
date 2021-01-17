# -*- coding: utf-8 -*-
import random  # 生成随机字符及数字的包
import string  # 字符串包
import re  # 正则表达式包


class Email(object):
    """ 邮箱类 """

    def __init__(self, firstname: str, lastname: str, department: str, company: str):
        """ 初始化默认邮箱 """
        # 邮箱拥有者的姓名(按照国外标准，首字母大写)
        self.username = f"{lastname[0].upper()}{lastname[1:].lower()} {firstname[0].upper()}{firstname[1:].lower()}"
        if department is None:  # 没有部门归属
            self.email = f"{lastname.lower()}.{firstname.lower()}@{company.lower()}.com"  # 默认邮箱地址(字符全部换为小写字母)
        else:  # 有部门归属
            self.email = f"{firstname.lower()}.{lastname.lower()}@{department.lower()}.{company.lower()}.com"
        self.password = "".join(random.sample(string.ascii_letters + string.digits, 8))  # 默认邮箱密码(随机生成8位)
        self.max_capacity = 100  # 邮箱最大可接收邮件数量
        self.mails = []  # 邮件内容(可创建新对象，但暂无此需求，可默认空)
        self.department = department
        self.company = company

    def set_mail(self, new_address: str = None, new_password: str = None, max_capacity: int = None):
        """ 设置方法 """
        try:
            if new_address is not None:
                # 如果新设置邮箱地址，利用正则表达式替换默认邮箱地址
                # firstname.lastname@sales.ZHIFENG.com
                # new_address@sales.ZHIFENG.com
                self.email = re.sub("[a-z]*.[a-z]*@", f"{new_address}@", self.email)
            if new_password is not None:
                # 如果新设置密码
                self.password = new_password
            if max_capacity is not None:
                # 如果新设置邮箱容量
                self.max_capacity = max_capacity
        except Exception as e:
            # 如果出现错误进行捕获
            print(f"邮箱设置函数错误：{e}")

    def get_mail(self):
        """ 获取邮件信息（以字典的形式进行返回） """
        info = {
            "username": self.username,
            "email": self.email,
            "password": self.password,
            "mails": self.mails,
            "max_capacity": self.max_capacity,
            "department": self.department,
            "company": self.company
        }
        return info


# -*- coding: utf-8 -*-
from email import Email
import time


class Main(object):
    """ 程序运行类 """
    def __init__(self):
        self.email_containers = []  # 存储所有邮箱账号
        self.run()

    def display(self):
        """ 程序界面 """
        print("*"*22)
        print(f"\t\t邮箱系统\t\t")
        print("\t\t添加账号（1）\t")
        print("\t\t查看账号（2）\t")
        print("\t\t修改账号（3）\t")
        print("\t\t删除账号（4）\t")
        print("\t\t退出系统（0）\t")
        print("*"*22)

    def add_email(self):
        """ 添加账号 """
        try:
            while True:
                lastname = input("请输入姓氏: ")
                if lastname != '':
                    break
                print("\t\t输入不能为空！！！")
            while True:
                firstname = input("请输入名字: ")
                if firstname != '':
                    break
                print("\t\t输入不能为空！！！")
            while True:  # 判断department是否合法
                department = input("请输入部门[sales, development, accounting](无部门输入no): ")
                if department in ["sales", "development", "accounting", "no"]:
                    break
                print("\t不存在此部门，请重新输入！！！")
            while True:
                company = input("请输入公司: ")
                if company != '':
                    break
                print("\t\t输入不能为空！！！")
            department = None if department == 'no' else department  # 如果没有部门归属,返回None,否则正常返回
            email = Email(firstname, lastname, department, company)  # 调用邮箱类，创建邮箱对象
            self.email_containers.append(email)
            print("\t\t添加成功!!!\t\t")
        except Exception as e:
            print(f"添加账号函数错误：{e}")

    def get_emails(self):
        """ 打印所有邮箱信息 """
        try:
            if len(self.email_containers) == 0:
                print("\t\t暂无邮箱信息!!!\t\t")
            else:
                for email in self.email_containers:
                    email = {
                        "姓名": email.get_mail()["username"],
                        "邮箱地址": email.get_mail()["email"],
                        "邮箱密码": email.get_mail()['password'],
                        "邮箱容量": email.get_mail()["max_capacity"],
                        "邮件内容": email.get_mail()["mails"],
                    }
                    print(email)
        except Exception as e:
            print(f"获取邮箱账号函数错误：{e}")

    def get_email_by_address(self, address):
        """ 查找邮箱信息 """
        try:
            for index, email in enumerate(self.email_containers):  # 顺序遍历列表
                if address == email.get_mail()['email']:
                    # 存在对应的信息，获取账号所在位置下标
                    return index
            print("\t\t邮箱不存在!!!\t\t")
            return False
        except Exception as e:
            print(f"查找邮箱函数错误：{e}")

    def delete_email(self):
        """ 删除邮箱 """
        try:
            mail_address = str(input("请输入要删除的邮箱地址: "))
            index = self.get_email_by_address(mail_address)
            if index and self.email_containers.pop(index):  # 删除账号
                print("\t\t删除邮箱成功!!!\t\t")
        except Exception as e:
            print(f"删除邮箱函数错误：{e}")

    def update_email(self):
        """ 修改邮箱信息 """
        try:
            mail_address = str(input("请输入要修改的邮箱地址: "))
            index = self.get_email_by_address(mail_address)
            if index is False:
                return
            email = self.email_containers[index]  # 获取账号对象
            while True:
                print("-" * 25)
                print("\t\t修改地址（1）\t")
                print("\t\t修改密码（2）\t")
                print("\t\t修改邮箱容量（3）\t")
                print("\t\t修改结束，退出修改（0）\t")
                update = input("请选择修改项：")
                if update == "1":
                    new_address = str(input("请输入新的邮箱地址: "))
                    email.set_mail(new_address=new_address)  # 更新数据
                    print("\t\t修改成功！！！")
                elif update == "2":
                    new_password = str(input("请输入新的密码: "))
                    email.set_mail(new_password=new_password)  # 更新数据
                    print("\t\t修改成功！！！")
                elif update == "3":
                    max_capacity = str(input("请重置邮箱容量: "))
                    email.set_mail(max_capacity=max_capacity)  # 更新数据
                    print("\t\t修改成功！！！")
                elif update == "0":
                    break
                else:
                    print("\t输入错误，重新输入")
            email = {
                "姓名": email.get_mail()["username"],
                "邮箱地址": email.get_mail()["email"],
                "邮箱密码": email.get_mail()['password'],
                "邮箱容量": email.get_mail()["max_capacity"],
                "邮件内容": email.get_mail()["mails"]
            }
            print("\t更新邮箱成功，结果显示如下")
            print(email)
        except Exception as e:
            print(f"修改邮箱函数错误：{e}")

    def run(self):
        try:
            """ 主函数 """
            while True:
                self.display()
                fun = str(input("请输入编号进行操作:"))
                if fun == "1":
                    self.add_email()
                elif fun == "2":
                    self.get_emails()
                elif fun == "3":
                    self.update_email()
                elif fun == "4":
                    self.delete_email()
                elif fun == "0":
                    break
                else:
                    print("\t输入错误，重新输入")
                time.sleep(1)  # 间隔1秒再显示
            print(f"{'*' * 5} 系统停止运行，数据清空 {'*' * 5}")
        except Exception as e:
            print(f"主函数错误：{e}")


if __name__ == "__main__":
    Main()

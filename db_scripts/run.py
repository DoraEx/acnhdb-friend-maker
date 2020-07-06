import xlrd
import extract_sheet as es
from pymongo import MongoClient

client = MongoClient()
db = client.acnhdb

def run():
    workbook = xlrd.open_workbook('data.xlsx')

    for sheet in workbook.sheets():
        # sheet = workbook.sheet_by_name('Villagers')
        #1. extract the list of documents
        documents = es.run(sheet)
        #2. add to collection based on category name
        if len(documents) == 0:
            continue
    collection = db[documents[0]['category']]
    collection.insert_many(documents)
    
if __name__ == '__main__':
    run()
    
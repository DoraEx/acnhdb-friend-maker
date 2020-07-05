import xlrd
import converters as c
import models.Clothing as m
from pymongo import MongoClient
import json


def populate_data(workbook, sheetName, category):
    sheet = workbook.sheet_by_name(sheetName)

    #2. Get column names
    col_names = []
    for col_idx in range(1, sheet.ncols):
        col_names.append(str(sheet.cell(0, col_idx).value))
        
    #3. Get the unique names (remove header)
    all_names = sheet.col_values(0)[1:]
    unique_names = set(all_names)

    #4. Build dictionary using names
    items = { name : [] for name in unique_names }


    #5. Match the rows to the name
    for row_idx in range(1, sheet.nrows):
        row = sheet.row(row_idx)
        items[row[0].value].append(row)


    for key in items:
        if len(items[key]) == 0:
            print(key)
    #6. Convert each row to needed values and map to object
    clothings = []
    for row_list in items.values():
        new_list = []
        for row in row_list:
            new_list.append(c.convert_clothing(row, category))
        clothing = m.Clothing(category, new_list)
        clothings.append(clothing)


    clothings_dict = [ json.loads(clothing.toJSON()) for clothing in clothings]

    #7. Save objects in mongo collection
    client = MongoClient()
    db = client.acnhdb
    inserted = db.clothing.insert_many(clothings_dict)



def start(workbook):
    #A. Map categories to sheets
    clothing = {
        'Tops' : 'tops',     
        'Headwear' : 'headewear',
        'Accessories' : 'accessories',
        'Socks' : 'socks',
        'Bags' : 'bags',
        'Shoes' : 'shoes',
        'Umbrellas' : 'umbrellas',
        'Bottoms' : 'bottoms',
        'Dress-Up' : 'dress up',
        'Clothing Other' : 'other'
    }
    for k in clothing:
        print(k, clothing[k])
        populate_data(workbook, k,  clothing[k])
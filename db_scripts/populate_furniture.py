
import converters as c
import models.Furniture as m
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
    furnitures = []
    for row_list in items.values():
        new_list = []
        for row in row_list:
            new_list.append(c.convert_furniture(row))
        furniture = m.Furniture(category, new_list)
        furnitures.append(furniture)


    furnitures_dict = [ json.loads(furniture.toJSON()) for furniture in furnitures]

    #7. Save objects in mongo collection
    client = MongoClient()
    db = client.acnhdb
    inserted = db.furniture.insert_many(furnitures_dict)


def start(workboook):
    #A. Map categories to sheets
    sheet_map = {
        'Housewares' : 'housewares',
        'Wall-mounted' : 'wallmounted',
        'Miscellaneous' : 'miscellaneous'
    }
    for k in sheet_map:
        print(k, sheet_map[k])
        populate_data(k, sheet_map[k])
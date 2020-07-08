import re
import xlrd

import converters as converters

variant_properties = [
    'variation',
    'body_title',
    'pattern',
    'pattern_title',
    'color_1',
    'color_2',
    'filename',
    'variant_id',
    'unique_id',
]
def get_column_names(sheet):
    col_names = []
    for col_idx in range(0, sheet.ncols):
        name = str(sheet.cell(0, col_idx).value)
        name = convert_name_to_prop(name)
        col_names.append(name)
    return col_names

def convert_name_to_prop(name):
    name = name.strip().lower()
    name = re.sub('-|\s', '_', name)
    return name

def extract(sheet):
    print('extract')
    return

def group_variations(sheet):
    #1. Get the unique names (remove header)
    all_names = sheet.col_values(0)[1:]
    unique_names = set(all_names)

    #2. Build dictionary using names
    items = { name : [] for name in unique_names }

    #3. Match the rows to the name
    for row_idx in range(1, sheet.nrows):
        row = sheet.row(row_idx)
        items[row[0].value].append(row)

    return items

def create_documents(groups, properties):
    documents = []
    #1. Split the properties into varaint specific and group properties
    for key in groups:
        if len(groups[key]) == 1:
            continue
        else:
            sample_rows = groups[key]
            break
    variant_properties = []
    group_properties = []
    for prop in properties:
        if prop in variant_properties:
            variant_properties.append(prop)
        else:
            values = [row[prop] for row in sample_rows]
            has_diff= [True for value in values[1:] if value != values[0]]
            if len(has_diff) == 0:
                group_properties.append(prop)
            else:
                variant_properties.append(prop)

    for key in groups:
        rows = groups[key]
        document = {}
        document['variations'] = []
        for prop in group_properties:
            document[prop] = rows[0][prop]
        
        for row in rows:
            variant = {}
            for prop in variant_properties:
                variant[prop] = row[prop]
            document['variations'].append(variant)
        documents.append(document)

    return documents



def extract_variations(sheet, properties):
    groups = group_variations(sheet)
    for key in groups:
        groups[key] = converters.convert_rows(groups[key], properties)
    
    documents = create_documents(groups, properties)
    return documents

def extract(sheet, properties):
    documents = []
    rows = converters.convert_rows(sheet.get_rows(), properties)
    for row in rows[1:]:
        document = {}
        for prop in properties:
            if prop == 'unique_entry_id':
                document['_id'] = row[prop]
            else:
                document[prop] = row[prop]
        documents.append(document)
    return documents

def run(sheet):
    properties = get_column_names(sheet)
    documents = None
    if 'variation' in properties:
        documents = extract_variations(sheet, properties)
    else:
        documents = extract(sheet, properties)


    #add category and id
    category =  convert_name_to_prop(sheet.name)
    for document in documents:
        document['category'] = category
    return documents

if __name__ == "__main__":
    workbook = xlrd.open_workbook('data.xlsx')
    sheet = workbook.sheet_by_name("Villagers")
    run(sheet)
    


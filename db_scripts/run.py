import populate_furniture as pf
import populate_clothing as pc

import xlrd
def run():
    workbook = xlrd.open_workbook('data.xlsx')
    # pf.start(workbook)
    pc.start(workbook)
    
if __name__ == '__main__':
    run()
    
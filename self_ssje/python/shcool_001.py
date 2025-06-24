import random
import matplotlib.pyplot as plt
import numpy as np
from skimage import io
from numpy import median,mean,cov,linalg,transpose,sum
import time
from itertools import chain

def fl_xz(wenjian,outwenjian,shuliang,jingdu,boduan):
    star = time.time()
    img = io.imread(wenjian)
    # img=img.transpose((1, 2, 0))//格式转换
    leh,lel,fe,color,img2 = len(img),len(img[0]),[],[],list(chain.from_iterable(img))
    print(img.shape)
    lee = len(img2)
    img1,bb = list(range(lee)),list(range(shuliang))
    for i5 in range(lee):
        img1[i5]=[]
        for i4 in boduan:
            img1[i5].append(img2[i5][i4-1])
        img1[i5]=np.array(img1[i5])
    print("选取的波段数：",len(img1[0]))
    for i1 in range(shuliang):
        color.append(np.uint8([ random.randint(0, 255), random.randint(0, 255),random.randint(0, 255)]))
        fe.append((img1[random.randint(0, leh - 1)]+img1[random.randint(0, leh - 1)])//2)
        bb[i1]=[]
    ll1,dd,j=list(range(shuliang)),list(range(shuliang)),0

    while True:
        newimg=[]
        for i2 in range(shuliang):
            dd[i2] = sum((img1 - fe[i2])**2,1)
        for i in range(lee):
            newimg1 = []
            d = np.argmin([x[i] for x in dd])
            for i2 in range(shuliang):
                if d == i2:
                    bb[i2].append(img1[i])
                    newimg1.append(color[i2])
            newimg += newimg1
        newimg=np.array(newimg).reshape(leh,lel,3)
        j += 1
        for i3 in range(shuliang):
            ll1[i3]=sum((median(bb[i3], 0) - fe[i3]) ** 2)
        if j==10:
            newimg = np.uint8(newimg)
            io.imsave(outwenjian, newimg)
            break
        elif mean(ll1) >= jingdu:
            for i2 in range(shuliang):
                fe[i2] = (mean(bb[i2], 0))
        else:
            newimg = np.uint8(newimg)
            io.imsave(outwenjian, newimg)
            break
        newimg = np.uint8(newimg)
        io.imsave(outwenjian, newimg)
    end = time.time()
    print("完成分类",'运行时间: %s S'%(end-star))

# fl_xz('rh2.tif','rh2_21.tif',3,1,[1,2,3])
fl_xz('../../public/0.png','../../public/1.png',3,1,[1,2,3])
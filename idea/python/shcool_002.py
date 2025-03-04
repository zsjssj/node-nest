
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import os
import time
import random
import numpy as np
from skimage import io,exposure
from numpy import median,mean,cov,linalg,transpose,sum

class Zsj_Cluster:
    def __init__(self,file_name):
        self.file_name=file_name
        self.img_value = np.int64(io.imread(file_name))
        self.weith=self.img_value.shape[1]
        self.heigh=self.img_value.shape[0]
        self.img_blue =  self.img_value.transpose((2, 0, 1))[0]
        self.img_green =  self.img_value.transpose((2, 0, 1))[1]
        self.img_red =  self.img_value.transpose((2, 0, 1))[2]
        self.img_nir =  self.img_value.transpose((2, 0, 1))[3]
        self.img_ndwi=(self.img_green - self.img_nir) / (self.img_green + self.img_nir)
        self.img_nndwi = (self.img_red + self.img_nir) / (self.img_green * 2)
        self.color=[[0,0,0],[0,255,255],[255,0,255],[255,255,0],[0,255,0],[255,0,0],[0,0,255],
               [0,128,128],[128,0,128],[128,128,0],[128,0,0],[0,128,0],[0,0,128],
               [255,128,128],[128,255,128],[128,128,255],[128,255,255],[255,128,255],[255,255,128],[255,255,255]]
        self.ndwi=0.09  #设置的水体指数ndwi阈值

    def zsj_fenlei_ndwi(self,yuzhi,outwenjian):    #fazhi1:确定水体指数ndwi分类阀值；outwenjian:保存的文件地址及名字
        star=time.time()
        ndwi = self.img_ndwi
        ndwi_1 = np.array(ndwi).reshape(self.heigh * self.weith)
        new_img1 = [[255, 255, 255] for x in range(len(ndwi_1))]
        for i in np.array(np.where((ndwi_1 >= yuzhi))[0]):
            new_img1[i]=[0, 0, 0]
        new_img = np.uint8(np.array(new_img1).reshape(self.heigh, self.weith, 3))
        io.imsave(outwenjian, new_img)
        end = time.time()
        print('{:.2}秒'.format(end-star))
    def zsj_fenlei_nndwi(self,yuzhi,outwenjian):    #fazhi1:确定水体指数ndwi分类阀值；outwenjian:保存的文件地址及名字
        star=time.time()
        ndwi = self.img_nndwi
        ndwi_1 = np.array(ndwi).reshape(self.heigh * self.weith)
        new_img1 = [[255, 255, 255] for x in range(len(ndwi_1))]
        for i in np.array(np.where(ndwi_1 <= yuzhi)[0]):
            new_img1[i]=[0, 0, 0]
        new_img = np.uint8(np.array(new_img1).reshape(self.heigh, self.weith, 3))
        io.imsave(outwenjian, new_img)
        end = time.time()
        print('{:.2}秒'.format(end-star))


    def zsj_fenleik_distance1(self,e1):   #按照得到的图像展开为二维数组的索引值，获得距离矩阵
        blue_dis = self.img_blue - (self.img_blue.reshape(self.heigh * self.weith)[e1])
        green_dis = self.img_green - (self.img_green.reshape(self.heigh * self.weith)[e1])
        red_dis = self.img_red - (self.img_red.reshape(self.heigh * self.weith)[e1])
        nir_dis = self.img_nir - (self.img_nir.reshape(self.heigh * self.weith)[e1])
        dis= np.sqrt(blue_dis**2+green_dis**2+red_dis**2+nir_dis**2)
        return dis
    def zsj_fenleik_distance2(self,e1):   #按照得到的维度坐标，获得距离矩阵
        blue_dis = self.img_blue - e1[0]
        green_dis = self.img_green - e1[1]
        red_dis = self.img_red - e1[2]
        nir_dis = self.img_nir - e1[3]
        dis= np.sqrt(blue_dis**2+green_dis**2+red_dis**2+nir_dis**2)
        return dis

    def ndwi_variation(self):
        ndwi1 = [1 for x in range(self.heigh * self.weith)]
        for i in np.array(np.where(self.img_ndwi.reshape(self.heigh * self.weith) >= self.ndwi)[0]):
            ndwi1[i] = 3600
        ndwi_dis = np.array(ndwi1).reshape(self.heigh, self.weith)
        return  ndwi_dis

    def zsj_fenleik_distance3(self,e1):   #按照得到的图像展开为二维数组的索引值，获得距离矩阵
        blue_dis = self.img_blue - (self.img_blue.reshape(self.heigh * self.weith)[e1])
        green_dis = self.img_green - (self.img_green.reshape(self.heigh * self.weith)[e1])
        red_dis = self.img_red - (self.img_red.reshape(self.heigh * self.weith)[e1])
        nir_dis = self.img_nir - (self.img_nir.reshape(self.heigh * self.weith)[e1])
        ndwi_dis=self.ndwi_variation() -self.ndwi_variation().reshape(self.heigh*self.weith)[e1]
        dis= np.sqrt(blue_dis**2+green_dis**2+red_dis**2+nir_dis**2+ndwi_dis**2)
        # dis = np.sqrt(blue_dis ** 2 + green_dis ** 2 + red_dis ** 2 + nir_dis ** 2) + ndwi_dis
        return dis
    def zsj_fenleik_distance4(self,e1):   #按照得到的纬度坐标，获得距离矩阵
        blue_dis = self.img_blue - e1[0]
        green_dis = self.img_green - e1[1]
        red_dis = self.img_red - e1[2]
        nir_dis = self.img_nir - e1[3]
        ndwi_dis=self.ndwi_variation() - e1[4]
        dis= np.sqrt(blue_dis**2+green_dis**2+red_dis**2+nir_dis**2+ndwi_dis**2)
        return dis


    def zsj_ms_dis1(self,e1):   #按照得到的图像展开为二维数组的索引值，获得距离矩阵
        img2=self.img_value
        img1 = img2.reshape(self.heigh * self.weith, 4)
        img = np.append(img1.transpose(1, 0), [self.ndwi_variation().reshape(self.heigh * self.weith)],axis=0).transpose(1, 0)
        dis=[]
        imgT=img.T  #转置
        D = np.cov(imgT)  #协方差
        invD = np.linalg.pinv(D)  # 计算逆矩阵
        tp = img - img[e1]
        for i in range(self.heigh*self.weith):
            dis.append(np.sqrt(np.dot(np.dot(tp[i], invD), tp[i].T)))
        return np.array(dis)
    def zsj_ms_dis2(self,e1):   #按照得到的维度坐标，获得距离矩阵
        img2 = self.img_value
        img1 = img2.reshape(self.heigh * self.weith, 4)
        img = np.append(img1.transpose(1, 0), [self.ndwi_variation().reshape(self.heigh * self.weith)],
                        axis=0).transpose(1, 0)
        dis = []
        imgT = img.T  # 转置
        D = np.cov(imgT)  # 协方差
        invD = np.linalg.pinv(D)  # 计算逆矩阵
        tp = img - e1
        for i in range(self.heigh * self.weith):
            dis.append(np.sqrt(np.dot(np.dot(tp[i], invD), tp[i].T)))
        return np.array(dis)

    def zsj_ms_dis3(self,e1):   #按照得到的图像展开为二维数组的索引值，获得距离矩阵
        img=self.img_value.reshape(self.heigh*self.weith,4)
        dis=[]
        imgT=img.T  #转置
        D = np.cov(imgT)  #协方差
        invD = np.linalg.pinv(D)  # 计算逆矩阵
        tp = img - img[e1]
        for i in range(self.heigh*self.weith):
            dis.append(np.sqrt(np.dot(np.dot(tp[i], invD), tp[i].T)))
        return np.array(dis)
    def zsj_ms_dis4(self,e1):   #按照得到的维度坐标，获得距离矩阵
        img = self.img_value.reshape(self.heigh * self.weith, 4)
        dis = []
        imgT = img.T  # 转置
        D = np.cov(imgT)  # 协方差
        invD = np.linalg.pinv(D)  # 计算逆矩阵
        tp = img - e1
        for i in range(self.heigh * self.weith):
            dis.append(np.sqrt(np.dot(np.dot(tp[i], invD), tp[i].T)))
        return np.array(dis)


    def zsj_Kcenter(self,K):  #k-means++算法选取K个中心点
        center,dis1,i= [random.randint(0, self.heigh * self.weith - 1)],[],0
        while True:
            dis1.append(self.zsj_fenleik_distance1(center[i]).reshape(self.heigh * self.weith))
            dis2=np.array(dis1).min(0)
            center.append(np.argmax(dis2 ** 2 / sum(dis2 ** 2)))
            center1=center[-K:]
            i += 1
            if i-2**3+1 == K: break
        return center1
    def zsj_Kcenter2(self,K):  #k-means++算法选取K个中心点
        center,dis1,i= [random.randint(0, self.heigh * self.weith - 1)],[],0
        while True:
            dis1.append(self.zsj_fenleik_distance3(center[i]).reshape(self.heigh * self.weith))
            dis2=np.array(dis1).min(0)
            center.append(np.argmax(dis2 ** 2 / sum(dis2 ** 2)))
            center1=center[-K:]
            i += 1
            if i-2**3+1 == K: break
        return center1


    def zsj_Kmeansplus(self,K,jingdu,outwenjian):
        img=self.img_value
        img3 = img.reshape(self.heigh * self.weith, 4)
        dis,center,kk=[],self.zsj_Kcenter(K),np.arange(0,K,1)
        for i in range(K):
            dis.append(self.zsj_fenleik_distance1(center[i]).reshape(self.heigh * self.weith))
        iii,KK=0,[2**16,2**16,2**16,2**16]
        while True:
            dis1, ii,new_img1,dis3,fen,fen11,fen12= np.argmin(dis, axis=0), 0,[],np.copy(dis),\
                                              [[] for i in range(K)],[[] for i in range(K)],[[] for i in range(K)]
            for i1 in dis1:
                new_img1.append(self.color[-1])
                fen[np.where(kk==i1)[0][0]].append(img3[ii])
                fen11[np.where(kk==i1)[0][0]].append(self.img_ndwi.reshape(self.heigh * self.weith)[ii])
                fen12[np.where(kk == i1)[0][0]].append(ii)
                ii+=1
            new_center,mm=[],[]
            for i2 in range(K):
                new_center.append(median(fen[i2],axis=0))
                dis[i2] = self.zsj_fenleik_distance2(new_center[i2]).reshape(self.heigh * self.weith)
                mm.append(median(fen11[i2]))
            print(mean(abs(mean(dis,axis=1)-mean(dis3,axis=1))))
            if np.argmax(mm) >= 0.1:
                for i3 in fen12[np.argmax(mm)]:
                    new_img1[i3] = self.color[0]
            else:
                print('非水体')
            new_img = np.uint8(np.array(new_img1).reshape(self.heigh, self.weith, 3))
            io.imsave(outwenjian, new_img)
            KK.append(mean(abs(np.mean(dis, axis=1) - mean(dis3, axis=1))))
            # if mean(abs(np.mean(dis,axis=1)-mean(dis3,axis=1)))<jingdu:
            if KK[-1]-KK[-4] > 0 :break
            iii+=1

    def zsj_Kmeansplus2(self,K,jingdu,outwenjian):
        img=self.img_value
        img1 = img.reshape(self.heigh * self.weith, 4)
        img2 = np.append(img1.transpose(1, 0),[self.ndwi_variation().reshape(self.heigh * self.weith)],axis=0).transpose(1, 0)
        dis,center,kk=[],self.zsj_Kcenter2(K),np.arange(0,K,1)
        for i in range(K):
            dis.append(self.zsj_fenleik_distance3(center[i]).reshape(self.heigh * self.weith))
        iii=0
        while True:
            star=time.time()
            dis1, ii,new_img1,dis3,fen,fen11,fen12= np.argmin(dis, axis=0), 0,[],np.copy(dis),\
                                                    [[] for i in range(K)],[[] for i in range(K)],[[] for i in range(K)]
            for i1 in dis1:
                new_img1.append(self.color[-1])
                fen[np.where(kk==i1)[0][0]].append(img2[ii])
                fen11[np.where(kk == i1)[0][0]].append(self.img_ndwi.reshape(self.heigh * self.weith)[ii])
                fen12[np.where(kk == i1)[0][0]].append(ii)
                ii+=1
            new_center,mm=[],[]
            for i2 in range(K):
                new_center.append(np.mean(fen[i2],axis=0))
                dis[i2] = self.zsj_fenleik_distance4(new_center[i2]).reshape(self.heigh * self.weith)
                mm.append(median(fen11[i2]))
            end = time.time()
            if np.argmax(mm) >= 0.05:
                for i3 in fen12[np.argmax(mm)]:
                    new_img1[i3] = self.color[0]

            new_img = np.uint8(np.array(new_img1).reshape(self.heigh, self.weith, 3))
            io.imsave(outwenjian, new_img)
            print(mean(abs(np.mean(dis,axis=1)-mean(dis3,axis=1))),'{:.3}秒'.format(end-star))
            if np.mean(abs(np.mean(dis,axis=1)-np.mean(dis3,axis=1)))<jingdu:
                break
            iii+=1

    def zsj_Kmeansplus3(self,K,outwenjian):
        img=self.img_value
        img2 = img.reshape(self.heigh * self.weith, 4)
        dis,center,kk=[],self.zsj_Kcenter(K),np.arange(0,K,1)
        for i in range(K):
            dis.append(self.zsj_ms_dis3(center[i]).reshape(self.heigh * self.weith))
        iii,KK=0,[2**16,2**16,2**16,2**16]
        while True:
            dis1, ii,new_img1,dis3,fen,fen11,fen12= np.argmin(dis, axis=0), 0,[],np.copy(dis),\
                                                    [[] for i in range(K)],[[] for i in range(K)],[[] for i in range(K)]
            for i1 in dis1:
                new_img1.append(self.color[-1])
                fen[np.where(kk==i1)[0][0]].append(img2[ii])
                fen11[np.where(kk == i1)[0][0]].append(self.img_ndwi.reshape(self.heigh * self.weith)[ii])
                fen12[np.where(kk == i1)[0][0]].append(ii)
                ii+=1
            new_center,mm=[],[]
            for i2 in range(K):
                new_center.append(mean(fen[i2],axis=0))
                dis[i2] = self.zsj_ms_dis4(new_center[i2]).reshape(self.heigh * self.weith)
                mm.append(median(fen11[i2]))
            if np.argmax(mm)>=0.09:
                for i3 in fen12[np.argmax(mm)]:
                    new_img1[i3] = self.color[0]
                new_img = np.uint8(np.array(new_img1).reshape(self.heigh, self.weith, 3))
                io.imsave(outwenjian, new_img)
            else:
                print('非水体')
                break
            print(mean(abs(np.mean(dis,axis=1)-mean(dis3,axis=1))))
            KK.append(mean(abs(np.mean(dis, axis=1) - mean(dis3, axis=1))))
            if KK[-1]-KK[-4] >= 0:break
            iii+=1
        # data=csv.reader("D:/BS/xuexi/1/tezhen.xlsx")
        # print(data)
        # for i in fen[np.argmax(mm)]:
        #     data.append((7, 3.14, 'good'))
        #     df = pd.DataFrame('tezhen.xlsx')


# img=Zsj_Cluster("D:/BS/xuexi/1/cj006.tif")
# img.zsj_Kmeansplus(50,10,"D:/BS/xuexi/test/ts051.tif")
# img.zsj_Kmeansplus2(10,10,"D:/BS/xuexi/1/cj00121.tif")
# img.zsj_Kmeansplus3(6,"D:/BS/xuexi/1/cj00131.tif")
# img.zsj_fenlei_ndwi(0.02,"D:/BS/xuexi/1/cj00601.tif")
# print(np.max(img.img_red),np.max(img.img_blue),np.max(img.img_green),np.max(img.img_nir))




package com.project.shopapp.components;

import java.awt.MouseInfo;
import java.awt.Point;

public class MouseTracker {
    //775 467

    //862 522
    //942 602
    //889 574
    //962 658
    public static void main(String[] args) throws InterruptedException {
        while (true) {
            Point p = MouseInfo.getPointerInfo().getLocation();
            System.out.println("Tọa độ chuột: X=" + p.x + " Y=" + p.y);
            Thread.sleep(500); // Cập nhật mỗi 0.5 giây
        }
    }

}


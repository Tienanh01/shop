package com.project.shopapp.components;

import java.awt.Robot;
import java.awt.AWTException;
import java.awt.event.InputEvent;

public class ClickSimulator {
    public static void main(String[] args) {
       while(true){
           try {
               Robot robot = new Robot();
//
//               // Di chuyển chuột đến vị trí (500, 300)
//               robot.mouseMove(775, 467);
//
//               // Tạm dừng 1 giây để đảm bảo chuột đã di chuyển
//               Thread.sleep(15000);
//
//               // Click chuột trái
//               robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
//               robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
               doubleClickSequence(robot);
               System.out.println("Đã click vào vị trí (775, 467)");
           } catch (AWTException | InterruptedException e) {
               e.printStackTrace();
           }
       }
    }
    // Hàm thực hiện 2 lần click theo yêu cầu
    public static void doubleClickSequence(Robot robot) throws InterruptedException {
        // Click chuột trái tại (862, 522) - lần 1
//        robot.mouseMove(862, 522);
//        Thread.sleep(300); // delay nhẹ trước khi click
//        clickLeft(robot);
//        System.out.println("Đã click tại (862, 522) - lần 1");
//
//        Thread.sleep(3000); // Chờ 2 giây



    }

    public static void clickLeft(Robot robot) {
        robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
        robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
    }


}

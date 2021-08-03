package com.hsiangyu.config;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public Object TypeMismatchExceptionHandler(MethodArgumentTypeMismatchException exception) {
        System.out.println("exception.toString() = " + exception.toString());
        System.out.println("exception.getMessage() = " + exception.getMessage());
        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", -1);
        jsonObject.put("udaValue", exception.toString());
        jsonArray.put(jsonObject);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(jsonArray.toString());
    }
}

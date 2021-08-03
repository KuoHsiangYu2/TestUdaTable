package com.hsiangyu.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hsiangyu.model.UdaUnit;

@Controller
public class APIController {

    @RequestMapping(value = "/api/getUdaData/{id}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public ResponseEntity<List<UdaUnit>> getUdaData(@PathVariable Integer id) {
        List<UdaUnit> resultList = new ArrayList<UdaUnit>();
        if (id <= 0) {
            resultList.add(new UdaUnit(-1, "id cannot be less than or equal to 0"));
            return ResponseEntity.badRequest().body(resultList);
        }

        resultList.add(new UdaUnit(0, "apple"));
        resultList.add(new UdaUnit(1, "蘋果"));
        resultList.add(new UdaUnit(2, "banana"));
        resultList.add(new UdaUnit(3, "香蕉"));
        return ResponseEntity.ok(resultList);
    }

    @RequestMapping(value = "/api/saveUdaData/{id}", method = RequestMethod.POST, consumes = "application/json", produces = "text/html")
    @ResponseBody
    public ResponseEntity<String> saveUdaData(@PathVariable Integer id, @RequestBody List<UdaUnit> udaUnitList) {
        int length = udaUnitList.size();
        String unit = "";
        for (int i = 0; i < length; i++) {
            System.out.println("i = " + i);
            unit = String.format("udaUnitList.get(%d)[id] = %d", i, udaUnitList.get(i).getId());
            System.out.println(unit);
            unit = String.format("udaUnitList.get(%d)[udaValue] = %s", i, udaUnitList.get(i).getUdaValue());
            System.out.println(unit);
        }

        return ResponseEntity.ok("save data successful");
    }
}

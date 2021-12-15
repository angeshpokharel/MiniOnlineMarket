package com.waa.project.util;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ListMapper<T,E> {
    @Autowired
    ModelMapper modelMapper;

    public List<?> mapList(List<T> list, E convertTo){
        return
                list.stream()
                        .map(p -> modelMapper.map(p, convertTo.getClass()))
                        .collect(Collectors.toList());
    }
}

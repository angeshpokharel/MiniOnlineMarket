package com.waa.project.domain;

import lombok.*;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CATEGORY")
public class Category {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @Column(name= "category_name", nullable = false)
    private @NotBlank String categoryName;

    @Column(name = "description", nullable = false)
    private @NotBlank String description;

}

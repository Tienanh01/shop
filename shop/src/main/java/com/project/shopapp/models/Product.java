package com.project.shopapp.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Entity
@Builder
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", length = 355)
    @NotBlank
    private String name;
    @Column(name = "price")
    private Float price;
    @Column(name = "thumbnail")
    private String thumbnail;
    @Column(name = "description")
    private String description;


    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;



}

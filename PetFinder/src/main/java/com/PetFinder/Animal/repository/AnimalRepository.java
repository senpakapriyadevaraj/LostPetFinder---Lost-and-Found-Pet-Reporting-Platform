package com.PetFinder.Animal.repository;

import com.PetFinder.Animal.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
}

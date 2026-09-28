package com.PetFinder.Animal.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "animals")
public class Animal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long animalId;

    @NotBlank(message = "Species is required")
    @Column(nullable = false)
    private String species;

    private String breed;

    @NotBlank(message = "Colour is required")
    @Column(nullable = false)
    private String colour;

    public Animal() {
    }

    public Animal(String species, String breed, String colour) {
        this.species = species;
        this.breed = breed;
        this.colour = colour;
    }

    public Long getAnimalId() {
        return animalId;
    }

    public void setAnimalId(Long animalId) {
        this.animalId = animalId;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }
}

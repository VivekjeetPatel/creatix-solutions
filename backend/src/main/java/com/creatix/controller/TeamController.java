package com.creatix.controller;

import com.creatix.dto.Dtos;
import com.creatix.entity.TeamMember;
import com.creatix.repository.TeamMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TeamController {

    @Autowired private TeamMemberRepository teamRepo;

    @GetMapping("/public/team")
    public ResponseEntity<?> getPublicTeam() {
        List<TeamMember> list = teamRepo.findAllByOrderByDisplayOrderAsc();
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", list));
    }

    @GetMapping("/admin/team")
    public ResponseEntity<?> getAllTeam() {
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "OK", teamRepo.findAllByOrderByDisplayOrderAsc()));
    }

    @PostMapping("/admin/team")
    public ResponseEntity<?> createTeamMember(@RequestBody TeamMember member) {
        member.setId(null);
        TeamMember saved = teamRepo.save(member);
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Created", saved));
    }

    @PutMapping("/admin/team/{id}")
    public ResponseEntity<?> updateTeamMember(@PathVariable Long id, @RequestBody TeamMember updated) {
        return teamRepo.findById(id).map(t -> {
            updated.setId(id);
            return ResponseEntity.ok(new Dtos.ApiResponse(true, "Updated", teamRepo.save(updated)));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/team/{id}")
    public ResponseEntity<?> deleteTeamMember(@PathVariable Long id) {
        teamRepo.deleteById(id);
        return ResponseEntity.ok(new Dtos.ApiResponse(true, "Deleted"));
    }
}

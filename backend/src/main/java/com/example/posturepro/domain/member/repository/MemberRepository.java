package com.example.posturepro.domain.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.posturepro.domain.member.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	Optional<Member> findByProviderId(String providerId);

	@Query("SELECT m.profileImgUrl FROM Member m WHERE m.providerId = :providerId")
	Optional<String> findProfileImgUrlByProviderId(@Param("providerId") String providerId);
}

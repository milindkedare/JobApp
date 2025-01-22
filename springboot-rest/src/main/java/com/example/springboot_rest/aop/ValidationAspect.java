package com.example.springboot_rest.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ValidationAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(ValidationAspect.class);

    @Around("execution(* com.example.springboot_rest.service.JobService.*(..)) && args(postId,..)")
    public Object validateAndUpdate(ProceedingJoinPoint proceedingJoinPoint, int postId) throws Throwable {
        // Validate if postId is negative
        if (postId < 0) {
            LOGGER.info("PostId is negative, updating it.");
            postId = -postId;  // Convert to positive
            LOGGER.info("Updated PostId value: {}", postId); // Use {} placeholder
        }
        // Proceed with the updated argument
        return proceedingJoinPoint.proceed(new Object[]{postId});
    }
}

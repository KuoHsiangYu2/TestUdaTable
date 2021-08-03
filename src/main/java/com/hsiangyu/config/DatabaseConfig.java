package com.hsiangyu.config;

import javax.sql.DataSource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class DatabaseConfig {

    @Bean(name = "dbProductService")
    @ConfigurationProperties(prefix = "spring.db-product-service")
    @Primary
    public DataSource createProductServiceDataSource() {
        return DataSourceBuilder.create().build();
    }
}

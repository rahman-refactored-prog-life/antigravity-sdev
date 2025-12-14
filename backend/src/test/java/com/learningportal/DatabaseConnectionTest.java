package com.learningportal;

import org.junit.jupiter.api.Test;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Simple test to verify PostgreSQL database connection.
 * This test connects directly using JDBC without Spring Boot.
 */
public class DatabaseConnectionTest {

    private static final String DB_URL = "jdbc:postgresql://localhost:5432/learning-portal";
    private static final String DB_USER = "postgres";
    private static final String DB_PASSWORD = "password"; // Your PostgreSQL password

    @Test
    public void testDatabaseConnection() {
        System.out.println("🔍 Testing PostgreSQL Connection...");
        System.out.println("Database: learning-portal");
        System.out.println("Host: localhost:5432");
        System.out.println("User: " + DB_USER);
        System.out.println();

        try {
            // Load PostgreSQL JDBC Driver
            Class.forName("org.postgresql.Driver");
            
            // Attempt to connect
            Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            
            assertNotNull(connection, "Connection should not be null");
            assertFalse(connection.isClosed(), "Connection should be open");
            
            // Test a simple query
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT version()");
            
            if (resultSet.next()) {
                String version = resultSet.getString(1);
                System.out.println("✅ Connection successful!");
                System.out.println("PostgreSQL Version: " + version);
                System.out.println();
                System.out.println("Database is ready for Phase 1 implementation.");
            }
            
            // Clean up
            resultSet.close();
            statement.close();
            connection.close();
            
        } catch (ClassNotFoundException e) {
            fail("PostgreSQL JDBC Driver not found: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("❌ Connection failed!");
            System.err.println("Error: " + e.getMessage());
            System.err.println();
            System.err.println("Please check:");
            System.err.println("1. PostgreSQL is running");
            System.err.println("2. Database 'learning-portal' exists");
            System.err.println("3. Username and password are correct");
            System.err.println("4. Update DB_PASSWORD in this test if needed");
            fail("Database connection failed: " + e.getMessage());
        }
    }
}

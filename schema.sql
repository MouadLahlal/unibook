CREATE TABLE accounts (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE files (
    id VARCHAR(255) PRIMARY KEY,
    account_id VARCHAR(255) REFERENCES accounts(id) ON DELETE CASCADE,
    original_filename VARCHAR(255) NOT NULL,
    s3_filename VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_size INT NOT NULL, -- mb
    file_type VARCHAR(50), -- pdf/epub
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE platform_credentials (
    id VARCHAR(255) PRIMARY KEY,
    account_id VARCHAR(255) REFERENCES accounts(id) ON DELETE CASCADE,
    platform_name VARCHAR(100) NOT NULL,
    platform_username VARCHAR(150) NOT NULL,
    encrypted_password JSONB NOT NULL, -- {encrypted: string, iv: string}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_account_platform FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE INDEX idx_account_platform ON platform_credentials(account_id);
CREATE INDEX idx_account_id ON files(account_id);

-- Esempio
-- INSERT INTO accounts (username, email, password_hash)
-- VALUES ('john_doe', 'john@example.com', 'hashedpassword123');
-- INSERT INTO files (account_id, original_filename, s3_filename, file_size, file_type)
-- VALUES (1, 'ebook.pdf', 'random1234.pdf', 500000, 'pdf');